import React, { Fragment } from "react";
import Container from "../../../shared/Container";
import { useUSerhttp } from "../../../shared/util/useUSer-http";
import BelumBayarAll from "../components/BelumBayarAll";

function BelumBayar() {
  const { getCartsOrder, getData } = useUSerhttp();
  const hasilWaktu =
    getData.length === 0
      ? []
      : getData?.dataIdUser[0].keranjangOrder.waktuBatasPembayaran;

  return (
    <Fragment>
      <Container>
        <br />
        <br />
        <BelumBayarAll cartOrder={getCartsOrder} limit={hasilWaktu} />
      </Container>
    </Fragment>
  );
}

export default BelumBayar;
