import React, { useState } from "react";

function ColorPickerApp() {
  const [red, setRed] = useState("0");
  const [green, setGreen] = useState("0");
  const [blue, setBlue] = useState("0");
  const [transparan, setTransparan] = useState(1);

  const kondisiRed = (e) => {
    if (red >= 0 && red <= 255) {
      setRed(e.target.value);
    } else {
      alert("aduh nilainya harus angka <=255 dan >=0 bro");
      setRed(0);
    }
  };

  // const kondisiTransparan = (e) => {
  //   if (transparan <= 1) {
  //     setTransparan(e.target.value);
  //   } else {
  //     alert("aduh nilainya tuh harus desimal 0 sampai 1");
  //     setTransparan(1);
  //   }
  // };

  const kondisiBlue = (e) => {
    if (blue >= 0 && blue <= 255) {
      setRed(e.target.value);
    } else {
      alert("aduh nilainya harus angka <=255 dan >=0 bro");
      setBlue(0);
    }
  };

  const kondisiGreen = (e) => {
    if (green >= 0 && green <= 255) {
      setRed(e.target.value);
    } else {
      alert("aduh nilainya harus angka <=255 dan >=0 bro");
      setGreen(0);
    }
  };

  const cerahkan = (e) => {
    if (blue >= 255 && green >= 255 && red >= 255) {
      alert("aduh udah cukup lah");
    } else {
      let newBlue = blue + 10 <= 255 ? blue + 10 : 255;
      let newGreen = green + 10 <= 255 ? green + 10 : 255;
      let newRed = red + 10 <= 255 ? red + 10 : 255;

      setBlue(newBlue);
      setGreen(newGreen);
      setRed(newRed);
    }
  };

  const gelapkan = (e) => {
    if (blue === 0 && green === 0 && red === 0) {
      alert("aduh udah cukup lah");
    } else {
      //ternery operator
      let newBlue = blue - 10 >= 0 ? blue - 10 : 0;
      let newGreen = green - 10 >= 0 ? green - 10 : 0;
      let newRed = red - 10 >= 0 ? red - 10 : 0;

      setBlue(newBlue);
      setGreen(newGreen);
      setRed(newRed);
    }
  };
  const biru = (e) => {
    setBlue(255);
    setGreen(119);
    setRed(0);
  };

  const merah = (e) => {
    setRed(255);
    setGreen(0);
    setBlue(0);
  };

  const hijau = (e) => {
    setBlue(43);
    setGreen(255);
    setRed(43);
  };

  const random = (e) => {
    setRed(Math.floor(Math.random() * 255));
    setGreen(Math.floor(Math.random() * 255));
    setBlue(Math.floor(Math.random() * 255));
  };

  const reset = (e) => {
    setRed(0);
    setGreen(0);
    setBlue(0);
    setTransparan(1);
  };

  return (
    <div>
      <div>
        <div
          style={{
            backgroundColor: `rgb(${red}, ${green}, ${blue}, ${transparan})`,
            widht: 100,
            height: 100,
          }}
        ></div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex justify-between">
            <label>Red:</label>
            <input
              value={red}
              onBlur={kondisiRed}
              onChange={(e) => setRed(e?.target?.value)}
            />
          </div>
          <div className="flex justify-between">
            <label>Green:</label>
            <input
              value={green}
              onBlur={kondisiGreen}
              onChange={(e) => setGreen(e?.target?.value)}
            />
          </div>
          <div className="flex justify-between">
            <label>Blue:</label>
            <input
              value={blue}
              onBlur={kondisiBlue}
              onChange={(e) => setBlue(e?.target?.value)}
            />
          </div>
          <div className="flex justify-between">
            <label>transparansi:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              id="myRange"
              value={transparan}
              onChange={(e) => setTransparan(parseFloat(e?.target?.value))}
            />
          </div>
        </div>
      </div>
      <p className="mt-4">
        Nilai RGB: {red}, {green}, {blue}, {transparan}
      </p>

      <div className="flex flex-col justify-between gap-4 mt-4">
        <button
          className="px-5 text-slate-950 bg-[#F8F8FF] hover:bg-[#FF0404] active:bg-[#FF0404] hover:text-white"
          onClick={merah}
        >
          Merah
        </button>
        <button
          className="px-5 text-slate-950 bg-[#F8F8FF] hover:bg-[#3058F9] active:bg-[#3058F9] hover:text-white"
          onClick={biru}
        >
          {" "}
          Biru
        </button>
        <button
          className="px-5 text-slate-950 bg-[#F8F8FF] hover:bg-[#52E924] active:bg-[#52E924] hover:text-white"
          onClick={hijau}
        >
          Hijau
        </button>
        <div className="flex justify-between gap-3">
          <button
            className="px-10 text-slate-950 bg-[#F8F8FF] hover:bg-[#FF0404] active:bg-[#FF0404] hover:text-white"
            onClick={gelapkan}
          >
            gelapkan
          </button>
          <button
            className="px-10  text-slate-950 bg-[#F8F8FF] hover:bg-[#FF0404] active:bg-[#FF0404] hover:text-white"
            onClick={cerahkan}
          >
            Cerahkan
          </button>
        </div>
        <button
          className="px-10 text-slate-950 bg-[#F8F8FF] hover:bg-[#FF0404] active:bg-[#FF0404] hover:text-white"
          onClick={random}
        >
          random
        </button>
      </div>

      <button
        className="mt-4  bg-[#E93333] px-10 font-semibold"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
}
export default ColorPickerApp;
