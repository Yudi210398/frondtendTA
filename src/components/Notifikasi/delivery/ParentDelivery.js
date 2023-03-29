import React, { Fragment } from "react";
import Container from "../../shared/Container";
import { useOrderData } from "../../shared/util/useOrderData";
import KirimData from "./KirimData";

const ParentDelivery = () => {
  const { data } = useOrderData("datakirimproduk");
  const hasilData = data.filterData || [];
  return (
    <Fragment>
      <Container>
        <br />
        <br />
        <div className="row">
          <div className="col-12">
            {hasilData?.length === 0 && (
              <h1 className="text-center">Tidak Ada Pengiriman</h1>
            )}
          </div>
        </div>

        {hasilData.length > 0 &&
          hasilData.map((datas, i) => (
            <KirimData
              key={i}
              file={datas}
              dataArray={hasilData}
              dataAsli={data}
            />
          ))}
      </Container>
    </Fragment>
  );
};

export default ParentDelivery;
