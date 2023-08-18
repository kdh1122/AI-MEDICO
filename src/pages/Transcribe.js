import React, { useState }  from 'react';
import Amplify, { Storage, Predictions } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import awsconfig from '../aws-exports';
import mic from 'microphone-stream';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'
import InitState from './InitState'
import TopMenu from '../components/TopMenu'
import { updateTodo } from '../graphql/mutations';
import { listTodos } from '../graphql/queries';
import awsExports from "../aws-exports";
import { useEffect } from "react";
import { API, graphqlOperation } from 'aws-amplify';
Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());



function Transcribe(props) {
    // Transcribe 컴포넌트 내부에서
    const [items, setItems] = useState([]);
    const [selectedName, setSelectedName] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const [todoItems, setTodoItems] = useState([]);
    
    const dropdownStyle = {
        marginTop: '1em',
        marginLeft: '1em',
    };
    
    async function listTodoItem() {
        const todos = await API.graphql(graphqlOperation(listTodos));
        console.log(30, todos.data.listTodos.items);
        setItems(todos.data.listTodos.items);
    }
    
    useEffect(() => {
        listTodoItem(); // todo 항목을 가져와 todoItems 상태에 설정
    }, []);


    return (
        <div style={styles}>
            <InitState />
            <TopMenu />
            <div>
              <Dropdown text={selectedName || 'Select Patient'} pointing='top left' style={dropdownStyle}>
                  <Dropdown.Menu>
                      {items.map((item, index) => (
                          <Dropdown.Item key={index} icon='address card' text={item.name +' '+ item.birth} onClick={() => {
                              setSelectedName(item.name);
                              setSelectedId(item.id);
                          }} />
                      ))}
                  </Dropdown.Menu>
              </Dropdown>
            </div>
            <h2>Transcribe Page</h2>
            <p>환자를 선택 후 녹음을 시작하세요</p>
            <SpeechToText selectedId={selectedId} />
            <br/>
            <button onClick={() => props.history.push('/')}>Back to Main</button>
        </div>
    );
}

export default Transcribe;

function SpeechToText(props) {
  const [response, setResponse] = useState("Press 'start recording' to begin your transcription. Press STOP recording once you finish speaking.")

  function AudioRecorder(props) {
    const [recording, setRecording] = useState(false);
    const [micStream, setMicStream] = useState();
    const [audioBuffer] = useState(
      (function() {
        let buffer = [];
        function add(raw) {
          buffer = buffer.concat(...raw);
          return buffer;
        }
        function newBuffer() {
          console.log("resetting buffer");
          buffer = [];
        }

        return {
          reset: function() {
            newBuffer();
          },
          addData: function(raw) {
            return add(raw);
          },
          getData: function() {
            return buffer;
          }
        };
      })()
    );

    async function startRecording() {
      console.log('start recording');
      audioBuffer.reset();

      window.navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
        const startMic = new mic();

        startMic.setStream(stream);
        startMic.on('data', (chunk) => {
          var raw = mic.toRaw(chunk);
          if (raw == null) {
            return;
          }
          audioBuffer.addData(raw);

        });

        setRecording(true);
        setMicStream(startMic);
      });
    }

    async function stopRecording() {
      console.log('stop recording');
      const { finishRecording } = props;

      micStream.stop();
      setMicStream(null);
      setRecording(false);

      const resultBuffer = audioBuffer.getData();

      if (typeof finishRecording === "function") {
        finishRecording(resultBuffer);
      }

    }

    return (
      <div className="audioRecorder">
        <div>
          {recording && <button onClick={stopRecording}>Stop recording</button>}
          {!recording && <button onClick={startRecording}>Start recording</button>}
        </div>
      </div>
    );
  }

  function convertFromBuffer(bytes) {
    setResponse('Converting text...');

    Predictions.convert({
      transcription: {
        source: {
          bytes
        },
        // language: "en-US", // other options are "en-GB", "fr-FR", "fr-CA", "es-US"
      },
    }).then(({ transcription: { fullText } }) => {
      setResponse(fullText);
      if (props.selectedId) {
        updateSpecificTodoItem(props.selectedId, fullText);
      }
    })
    .catch(err => setResponse(JSON.stringify(err, null, 2)));
  }
  
  async function updateSpecificTodoItem(todoId, updatedDescription) {
        const updatedTodo = { id: todoId, description: updatedDescription };
        await API.graphql(graphqlOperation(updateTodo, { input: updatedTodo }));
    }

  return (
    <div className="Text">
      <div>
        <h3>Speech to text</h3>
        <AudioRecorder finishRecording={convertFromBuffer} />
        <p>{response}</p>
      </div>
    </div>
  );
}


const styles = {
    marginLeft: '1em',
    marginRight: '1em',
    marginTop: '2em'
}
