import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const Card1 = () => {
  return (
    <div>
      <Card style={{ width: '18rem', height: '20rem'}}>
      <Card.Img variant="top" src="./assets/Logo_2022_resolucion.jpg" />
      <Card.Body>
        <Card.Title>Registrar profesionales</Card.Title>
        <Card.Text>
          El sistema permite registrar un profesional y categorizarlo por la profesión que ejerce.
        </Card.Text>
        
      </Card.Body>
    </Card>
    </div>
  )
}

export default Card1
