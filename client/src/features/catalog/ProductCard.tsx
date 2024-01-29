import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { SingleProduct } from "../../app/models/product";

export default function ProductCard({product}:SingleProduct) {

  const { name ,pictureUrl, price, brand } = product

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: 'secondaary'}}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={name}
        titleTypographyProps={{
          sx: {
            fontWeight: 'bold',
            color: 'primary.main'
          }
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.dark' }}
        image={pictureUrl}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="secondary">
          ₩{(price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {brand}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  )
}
