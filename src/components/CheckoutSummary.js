import React, { useState, useEffect } from 'react';
import Amplify from 'aws-amplify';
import { Grid, Divider, Input, Segment, Button, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import { API, graphqlOperation } from 'aws-amplify';
import { createBlog, updateBlog, deleteBlog } from '../graphql/mutations';
import { listBlogs } from '../graphql/queries';
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

function CheckoutSummary(props) {
    const { user } = props;
    const [items, setItems] = useState([]);
    const [itemEmail, setItemEmail] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemBirth, setItemBirth] = useState('');
    const [itemPhone, setItemPhone] = useState('');

    async function createBlogItem() {
        const blog = {
            email: itemEmail,
            name: itemName,
            birth: itemBirth,
            phone: itemPhone,
        };
        await API.graphql(graphqlOperation(createBlog, { input: blog }));
        listBlogItem();
    }
    
    async function deleteBlogItem(blogId) {
        try {
            // 블로그 항목 삭제
            await API.graphql(graphqlOperation(deleteBlog, { input: { id: blogId } }));
            
            // 삭제 후에 리스트를 다시 로드하여 업데이트된 목록을 표시합니다.
            listBlogItem();
        } catch (error) {
            console.error('Error deleting blog item:', error);
        }
    }
    
    async function editBlogItem(blog) {
        // 사용자로부터 수정할 값을 입력 받습니다.
        const updatedEmail = prompt('Enter new email', blog.email);
        const updatedName = prompt('Enter new name', blog.name);
        const updatedBirth = prompt('Enter new birthdate (YYYY-MM-DD)', blog.birth);
        const updatedPhone = prompt('Enter new phone number', blog.phone);
    
        if (
            updatedEmail !== null &&
            updatedName !== null &&
            updatedBirth !== null &&
            updatedPhone !== null
        ) {
            // 업데이트할 블로그 항목의 정보를 생성합니다.
            const updatedBlog = {
                id: blog.id,
                email: updatedEmail,
                name: updatedName,
                birth: updatedBirth,
                phone: updatedPhone,
            };
    
            try {
                // 블로그 항목 업데이트
                await API.graphql(graphqlOperation(updateBlog, { input: updatedBlog }));
    
                // 업데이트 후에 리스트를 다시 로드하여 업데이트된 목록을 표시합니다.
                listBlogItem();
            } catch (error) {
                console.error('Error updating blog item:', error);
            }
        }
    }

    async function listBlogItem() {
        const blogs = await API.graphql(graphqlOperation(listBlogs));
        setItems(blogs.data.listBlogs.items);
    }

    useEffect(() => {
        listBlogItem();
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
                        <NormalText>{getAtt('given_name') + ' ' + getAtt('family_name')}</NormalText>
                    </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                    <Grid.Column width={4}>
                        <BoldText>Patient</BoldText>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Grid.Column width={4}>
                            <Input
                                placeholder="이메일 *"
                                value={itemEmail}
                                onChange={(event) => setItemEmail(event.target.value)}
                            />
                            <Input
                                placeholder="이름 *"
                                value={itemName}
                                onChange={(event) => setItemName(event.target.value)}
                            />
                            <Input
                                placeholder="주민번호 앞 6자리 *"
                                value={itemBirth}
                                onChange={(event) => {
                                    const inputText = event.target.value;
                                    setItemBirth(inputText.substring(0, 6));
                                }}
                            />
                            <Input
                                placeholder="전화번호(-없이) *"
                                value={itemPhone}
                                onChange={(event) => setItemPhone(event.target.value)}
                            />
                            
                            <Button color='orange' loading={props.placedOrder} onClick={createBlogItem}>
                                Add Patient
                            </Button>
                        </Grid.Column>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={1}></Grid.Column>
                    <Grid.Column width={15}></Grid.Column>
                </Grid.Row>
            </Grid>
            <Segment>
                {items.map((item, index) => (
                    <div key={index}>
                        <PatientItem>
                            <div>
                                {item.name} {item.birth} {item.email}
                            </div>
                            <ButtonGroup>
                                <Button color='red' onClick={() => deleteBlogItem(item.id)}>
                                    Delete
                                </Button>
                                <Button color='blue' onClick={() => editBlogItem(item)}>
                                    Edit
                                </Button>
                            </ButtonGroup>
                        </PatientItem>
                        {index !== items.length - 1 && <Divider />} {/* Divider를 감싸는 래퍼 추가 */}
                    </div>
                ))}
            </Segment>
        </div>
    )
}

export default CheckoutSummary;

const BoldText = styled.div`
    font-size: 17px;
    font-weight: bold;
`;

const NormalText = styled.div`
    font-size: 1em;
`;

const PatientItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;
