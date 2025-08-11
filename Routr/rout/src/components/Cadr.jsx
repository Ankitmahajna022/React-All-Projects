import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { Link } from "react-router-dom";

function Cadr({ id,title,price,image,onDelete}) {
 const DataFromDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/product/${id}`);
      console.log("Deleted:", response.data);
      if (onDelete) {
        onDelete(id); // Notify parent to remove this card
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
    <Card style={{ width: '18rem' }}>
       < Link to={`/description/${id}`}><Card.Img variant="top" src={image} /></Link>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
            {price}
        </Card.Text>
        <Button variant="primary" onClick={DataFromDelete}>Delete</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Cadr