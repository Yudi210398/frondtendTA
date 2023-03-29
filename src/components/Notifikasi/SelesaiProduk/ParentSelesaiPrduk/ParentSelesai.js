import React from "react";
import Container from "../../../shared/Container";
import { useOrderData } from "../../../shared/util/useOrderData";

export const ParentSelesai = () => {
  const { data } = useOrderData("datakirimprodukselesai");
  const hasilData = data?.filterData || [];
  console.log(hasilData);
  return (
    <Container>
      <br />
      <br />

      <div className="row">
        <div className="col-12">
          {hasilData?.length === 0 && (
            <h1 className="text-center">Tidak Ada Pesanan Selesai</h1>
          )}
        </div>
      </div>
    </Container>
  );
};
