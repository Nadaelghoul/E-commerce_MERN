import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface props {
    id: string;
    title: string;
    image: string;
    price: string;
}

export default function ProductCard({ title, image, price}: props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="280"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {price} EGP
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' size="small">Add to Cart</Button>
      </CardActions>
    </Card>
  );
}
