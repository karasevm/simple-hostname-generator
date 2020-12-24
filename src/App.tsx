import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Adjectives } from './data/adjectives';
import { Nouns } from './data/nouns';

function App() {
  let resultString = '';
  const [adjectiveCount, setAdjectiveCount] = useState(1);
  const [isCapitalized, setIsCapitalized] = useState(true);
  const [phraseArray, setPhraseArray] = useState<string[]>([]);
  console.log('rendering');

  useEffect(() => {
    const storageCapitalized = localStorage.getItem('hg-capitalized');
    if (storageCapitalized !== null) {
      setIsCapitalized(storageCapitalized === 'true');
    }
    const storageCount = localStorage.getItem('hg-count');
    if (storageCount !== null) {
      setAdjectiveCount(Number(storageCount));
    }
    setPhraseArray(generatePhraseArray());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adjectiveCount]);

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('hg-count', event.target.value);
    const count = Number(event.target.value);
    setAdjectiveCount(count);
  };

  const handleCapitalizationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    localStorage.setItem('hg-capitalized', String(event.target.checked));
    setIsCapitalized(event.target.checked);
  };

  const generatePhraseArray = () => {
    const words: string[] = [];
    for (let i = 0; i < adjectiveCount; i++) {
      words.push(Adjectives[Math.floor(Math.random() * Adjectives.length)]);
    }
    words.push(Nouns[Math.floor(Math.random() * Adjectives.length)]);
    return words;
  };

  for (const word of phraseArray) {
    if (isCapitalized) {
      resultString += capitalize(word);
    } else {
      resultString += word;
    }
  }

  return (
    <div className="App">
      <Container className="d-flex h-100">
        <Col
          className="justify-content-center align-self-center text-center"
          md={{ span: 12 }}
        >
          <h1 className="text-center">{resultString}</h1>
          <Row>
            <Col md={{ span: 4, offset: 3 }}>
              <Form.Group>
                <Form.Label>Adjective count: {adjectiveCount}</Form.Label>
                <Form.Control
                  type="range"
                  min="1"
                  max="5"
                  value={adjectiveCount}
                  onChange={handleCountChange}
                />
              </Form.Group>
            </Col>
            <Col md={{ span: 1 }}>
              <Form.Group>
                <Form.Label>Capitalize</Form.Label>
                <Form.Check
                  checked={isCapitalized}
                  onChange={handleCapitalizationChange}
                  type="checkbox"
                />
              </Form.Group>
            </Col>
            <Col className="align-self-center" md={{ span: 1 }}>
              <Button
                variant="primary"
                onClick={() => {
                  setPhraseArray(generatePhraseArray());
                }}
              >
                Refresh
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 2, offset: 5 }}></Col>
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default App;
