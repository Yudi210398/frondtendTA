import React from "react";
import Container from "../../../shared/Container";
import { useOrderData } from "../../../shared/util/useOrderData";

import Dikemasdata from "../../dikemas/components/Dikemasdata";

export const ParentSelesai = () => {
  const { data } = useOrderData("datakirimprodukselesai");
  const hasilData = data?.filterData || [];

  // const cariProduk = hasilData.map((data) => data?.produks);
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

        {hasilData.length > 0 &&
          hasilData.map((datas, i) => (
            <Dikemasdata
              key={i}
              file={datas}
              dataArray={hasilData}
              dataAsli={data}
              selesaiData={true}
            />
          ))}
      </div>
    </Container>
  );
};
