import React, { useEffect, useState } from "react";
import Container from "../../shared/Container";
import DataDiri from "../components/DataDiri";
import { useHttp } from "../../shared/util/http-hook";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Profile() {
  const { sendRequest } = useHttp();
  const token = useSelector((state) => state.login);
  const [getData, setGetData] = useState(null);
  const navigate = useNavigate();
  if (!token.userId) {
    navigate("/allProduct", { replace: true });
    alert("kocak");
  }

  try {
    useEffect(() => {
      const fetchs = async () => {
        const hasil = await Promise.all([
          await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL_API}/getaIdUsers`,
            "GET",
            null,
            {
              "Content-Type": "application/json",
              Authorization: `Dog ${token.tokenLogin}`,
            }
          ),
        ]);
        await setGetData(hasil[0].dataIdUser[0]);
      };
      fetchs();
    }, [sendRequest, token.tokenLogin]);
  } catch (err) {
    console.log(err);
  }

  return (
    <Container>
      <DataDiri dataUser={getData} />
    </Container>
  );
}

export default Profile;
