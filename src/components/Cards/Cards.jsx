import { Card, CardContent, Typography, Grid } from '@mui/material'
import styles from './Cards.module.css'

const Cards = ({data: { confirmed, recovered, deaths, lastUpdate }}) => {
    console.log({ confirmed })

    return confirmed ? (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Data 1
                        </Typography>
                        <Typography variant="h5">Data 2</Typography>
                        <Typography color="textSecondary">Date</Typography>
                        <Typography variant="body2">Data 3</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    ) : (
        <h1>Loading</h1>
    )
}

export default Cards
