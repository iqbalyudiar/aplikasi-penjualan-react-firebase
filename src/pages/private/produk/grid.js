import React, { useState, useEffect } from "react";

//material-ui
import {
  Fab,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import {
  Add as AddIcon,
  Image as ImageIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";

//styles
import useStyles from "./styles/grid";

// page component
import AddDialog from "./add";
import { useFirebase } from "../../../components/FirebaseProvider";
import { useCollection } from "react-firebase-hooks/firestore";

import AppPageLoading from "../../../components/AppPageLoading";

import { currency } from "../../../utils/formatter";

import { Link } from "react-router-dom";

const GridProduk = () => {
  const classes = useStyles();

  const { firestore, storage, user } = useFirebase();

  const produkCol = firestore.collection(`toko/${user.uid}/produk`);

  const [snapshot, loading] = useCollection(produkCol);

  const [produkItems, setProdukItems] = useState([]);

  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    if (snapshot) {
      setProdukItems(snapshot.docs);
    }
  }, [snapshot]);

  if (loading) {
    return <AppPageLoading />;
  }

  const handleDelete = (produkDoc) => async (e) => {
    if (window.confirm("Anda yakin ingin menghapus produk ini?")) {
      await produkDoc.ref.delete();

      const fotoURL = produkDoc.data().foto;

      if (fotoURL) {
        await storage.refFromURL(fotoURL).delete();
      }
    }
  };
  return (
    <>
      <Typography variant="h5" component="h1" paragraph>
        Daftar Produk
      </Typography>
      {produkItems.length <= 0 && (
        <Typography>Belum ada data produk</Typography>
      )}

      <Grid container spacing={5}>
        {produkItems.map((produkDoc) => {
          const produkData = produkDoc.data();
          return (
            <Grid key={produkDoc.id} item={true} xs={12} sm={12} md={6} lg={4}>
              <Card className={classes.card}>
                {produkData.foto && (
                  <CardMedia
                    className={classes.foto}
                    image={produkData.foto}
                    title={produkData.nama}
                  />
                )}
                {!produkData.foto && (
                  <div className={classes.fotoPlaceholder}>
                    <ImageIcon size="large" color="disabled" />
                  </div>
                )}
                <CardContent className={classes.produkDetails}>
                  <Typography variant="h5" noWrap>
                    {produkData.nama}
                  </Typography>
                  <Typography variant="subtitle1">
                    Harga: {currency(produkData.harga)}
                  </Typography>
                  <Typography variant="subtitle1">
                    Stok: {produkData.stok}
                  </Typography>
                </CardContent>
                <CardActions className={classes.produkActions}>
                  <IconButton
                    component={Link}
                    to={`/produk/edit/${produkDoc.id}`}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleDelete(produkDoc)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Fab
        className={classes.fab}
        color="primary"
        onClick={(e) => {
          setOpenAddDialog(true);
        }}
      >
        <AddIcon />
      </Fab>
      <AddDialog
        open={openAddDialog}
        handleClose={() => setOpenAddDialog(false)}
      />
    </>
  );
};

export default GridProduk;
