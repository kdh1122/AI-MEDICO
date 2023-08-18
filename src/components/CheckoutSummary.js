// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react'
import Amplify from 'aws-amplify';
import { Grid, Divider, Input, Segment, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo, updateTodo, deleteTodo } from '../graphql/mutations';
import { listTodos } from '../graphql/queries';
import awsExports from "../aws-exports";
import { useEffect, useState } from "react";
Amplify.configure(awsExports);

function CheckoutSummary(props) {
    const {user, total} = props
    const [items, setItems] = useState([]); // Todo 항목들을 저장할 상태 변수
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemBirth, setItemBirth] = useState('');

  // Todo 항목을 조회하는 useEffect
    async function createTodoItem() {
        const todo = {name: itemName, birth: itemBirth, description: itemDescription};
        await API.graphql(graphqlOperation(createTodo, { input: todo}));
        listTodoItem(); 
    }
    async function listTodoItem() {
        const todos = await API.graphql(graphqlOperation(listTodos));
        console.log(30, todos.data.listTodos.items);
        setItems(todos.data.listTodos.items);
    }
    async function deleteSpecificTodoItem(todoId) {
        await API.graphql(graphqlOperation(deleteTodo, { input: { id: todoId } }));
        listTodoItem(); // Refresh the todo list
    }
    async function updateSpecificTodoItem(todoId, updatedName, updatedBirth, updatedDescription) {
        const updatedTodo = { id: todoId, name: updatedName, birth: updatedBirth, description: updatedDescription };
        await API.graphql(graphqlOperation(updateTodo, { input: updatedTodo }));
        listTodoItem(); // Refresh the todo list
    }


    
    useEffect(() => {
        listTodoItem();
    }, []);

    function getAtt(name) {
        return user ? user[name] : ""
    }

    return (
        <div>
            <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <BoldText>Doctor</BoldText>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <NormalText>{getAtt('given_name') + ' ' + getAtt('family_name')}
                            </NormalText>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider/>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <BoldText>Patient</BoldText>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Grid.Column width={4}>
                                <Input
                                    placeholder="이름 *"
                                    value={itemName}
                                    onChange={(event) => setItemName(event.target.value)}
                                />
                                <Input
                                    placeholder="주민번호 앞 6자리 *"
                                    value={itemBirth}
                                    onChange={(event) => setItemBirth(event.target.value)}
                                />
                                <Input
                                    placeholder="증상"
                                    value={itemDescription}
                                    onChange={(event) => setItemDescription(event.target.value)}
                                />
                                <Button color='orange' loading={props.placedOrder} onClick={createTodoItem}>
                                    Add Patient
                                </Button>
                            </Grid.Column>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column width={1}></Grid.Column>
                    <Grid.Column width={15}>
                        
                    </Grid.Column>
                </Grid.Row>
                </Grid>
                <Segment>
                    {items.map((item, index) => (
                        <div key={index}>
                            {item.name} {item.birth} - {item.description}
                            <Button size='mini' color='red' onClick={() => deleteSpecificTodoItem(item.id)}>Delete</Button>
                            <Button size='mini' color='blue' onClick={() => {
                                const updatedName = prompt("Enter updated name:", item.name);
                                const updatedBirth = prompt("Enter updated birth:", item.birth);
                                const updatedDescription = prompt("Enter updated description:", item.description);
                                if (updatedName && updatedBirth && updatedDescription) {
                                    updateSpecificTodoItem(item.id, updatedName, updatedBirth, updatedDescription);
                                }
                            }}>Update</Button>
                            <Divider/>
                        </div>
                    ))}
                </Segment>
        </div>
    )
}

export default CheckoutSummary

const BoldText = styled.div`
  font-size: 17px;
  font-weight: bold;
`
const NormalText = styled.div`
  font-size: 1em;
`
const TotalText = styled.div`
  font-size: 1.2em;
  font-weight: bold
  color: #B12704;
`