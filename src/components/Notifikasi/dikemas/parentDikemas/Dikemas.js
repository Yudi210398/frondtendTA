import React, { Fragment } from "react";
import Container from "../../../shared/Container";
import { useOrderData } from "../../../shared/util/useOrderData";
import Dikemasdata from "../components/Dikemasdata.js";

function Dikemas() {
  const { data } = useOrderData("datakemas");
  const hasilData = data.ordersData || [];
  return (
    <Fragment>
      <Container>
        <br />
        <br />

        <div className="row">
          <div className="col-12">
            {hasilData?.length === 0 && (
              <h1 className="text-center">Tidak Ada Order</h1>
            )}
          </div>
        </div>

        {hasilData.length > 0 &&
          hasilData.map((datas, i) => (
            <Dikemasdata
              key={i}
              file={datas}
              dataArray={hasilData}
              dataAsli={data}
            />
          ))}
      </Container>
    </Fragment>
  );
}

export default Dikemas;
