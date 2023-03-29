import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    tokenLogin: null,
    userId: null,
    keranjang: [],
    selekasiCartUbah: [],
    totalhargaKeranjang: 0,
    totalhargaKeranjanglength: 0,
    transaksi: null,
  },
  reducers: {
    isLogin: (state, action) => {
      state.tokenLogin = action.payload.tokenLogin;
      state.userId = action.payload.userId;
      state.keranjang = action.payload.keranjang;
    },
    isLogout: (state) => {
      state.tokenLogin = null;
      state.userId = null;
      state.keranjang = 0;
    },

    isSelekasiCart: (state, action) => {
      state.selekasiCartUbah = action.payload.selekasiCartUbah;
    },

    isTotalHargaKeranjang: (state, action) => {
      state.totalhargaKeranjang = action.payload.totalhargaKeranjang;
    },

    isTotalHargaKeranjangLength: (state, action) => {
      state.totalhargaKeranjanglength =
        action.payload.totalhargaKeranjanglength;
    },

    isTransaksi: (state, action) => {
      state.transaksi = action.payload.transaksi;
    },

    iscartOrder: (state) => {
      state.totalhargaKeranjanglength = 0;
    },
  },
});

export const {
  iscartOrder,
  isLogin,
  isLogout,
  isSelekasiCart,
  isTotalHargaKeranjang,
  isTransaksi,
  isTotalHargaKeranjangLength,
} = authSlice.actions;
export default authSlice.reducer;
