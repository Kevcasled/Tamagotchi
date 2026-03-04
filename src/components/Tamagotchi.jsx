import { useState, useEffect, useRef } from "react";
import fuertImg from "../assets/fuerte.png";
import normalImg from "../assets/normal.png";
import hambriImg from "../assets/hambriento.png";
import debilImg from "../assets/debil.png";

const stateImages = {
  fuerte: fuertImg,
  normal: normalImg,
  hambriento: hambriImg,
  débil: debilImg,
};

export function Tamagotchi() {
  // Manejo de Estados (Página 5 y 7)
  const [proteina, setProteina] = useState(80);
  const [pesas, setPesas] = useState(70);
  const [musculo, setMusculo] = useState(80);
  const [tamagotchiState, setTamagotchiState] = useState("fuerte");
  
  const timer = useRef();

  useEffect(() => {
    timer.current = setInterval(() => {
      setProteina(proteina => Math.max(proteina - 1, 0)); // La proteína se consume con el tiempo
      setPesas(pesas => Math.max(pesas - 1, 0)); // La energía para entrenar disminuye
      setMusculo(musculo => Math.max(musculo - 1, 0)); // El músculo se atrofia sin ejercicio
    }, 3000); // Se actualiza cada 3 segundos

    return () => clearInterval(timer.current); // Limpieza de Efectos
  }, []);

  const comer = () => {
    setProteina(prevProteina => Math.min(prevProteina + 20, 100));
    setMusculo(prevMusculo => Math.min(prevMusculo + 5, 100));
    setPesas(prevPesas => Math.min(prevPesas + 5, 100));
  };

  const entrenar = () => {
    setPesas(prevPesas => Math.min(prevPesas + 20, 100));
    setProteina(prevProteina => Math.max(prevProteina - 5, 0)); // Consume proteína
    setMusculo(prevMusculo => Math.min(prevMusculo + 10, 100)); // Gana músculo
  };

  const descansar = () => {
    setMusculo(prevMusculo => Math.min(prevMusculo + 15, 100)); // El músculo crece con el descanso
    setProteina(prevProteina => Math.max(prevProteina - 5, 0));
    setPesas(prevPesas => Math.min(prevPesas + 10, 100)); // Recupera energía
  };

  // Función para color dinámico (Página 7)
  const getProgressColor = (value) => {
      if (value > 60) return "bg-green-500"; // Verde para valores altos
      if (value > 20) return "bg-yellow-500"; // Amarillo para valores medios
      return "bg-red-500"; // Rojo para valores bajos
  };

  // Determinar estado visual del Tamagotchi
  useEffect(() => {
    if (musculo < 20 || proteina < 15) {
      setTamagotchiState("débil");
    } else if (proteina < 30) {
      setTamagotchiState("hambriento");
    } else if (pesas >= 60 && musculo >= 60) {
      setTamagotchiState("fuerte");
    } else {
      setTamagotchiState("normal");
    }
  }, [proteina, pesas, musculo]);

  return (
    <div className="max-w-2xl w-full mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Gym Tamagotchi 💪</h1>
      
      {/* Imagen animada del Tamagotchi */}
      <div className="flex justify-center mb-8">
        <img
          src={stateImages[tamagotchiState]}
          alt={tamagotchiState}
          className="tamagotchi-img w-48 h-48 object-contain"
        />
      </div>
      <p className="text-center text-lg mb-8 text-white capitalize font-semibold">Estado: {tamagotchiState}</p>
      
      <div className="flex flex-col gap-3 mb-8">
        {/* Barras de estado con estilos de Tailwind */}
        
        {/* Proteína */}
        <div className="flex items-center">
          <label className="w-28 font-semibold text-white text-lg">Proteína:</label>
          <div className="flex-1 bg-gray-700 h-6 rounded-lg overflow-hidden">
            <div 
                className={`${getProgressColor(proteina)} h-full transition-all duration-500`} 
                style={{ width: `${proteina}%` }} 
            />
          </div>
          <span className="ml-3 text-base font-bold w-14 text-right text-white">{proteina}%</span>
        </div>

        {/* Pesas */}
        <div className="flex items-center">
            <label className="w-28 font-semibold text-white text-lg">Pesas:</label>
            <div className="flex-1 bg-gray-700 h-6 rounded-lg overflow-hidden">
                <div 
                    className={`${getProgressColor(pesas)} h-full transition-all duration-500`} 
                    style={{ width: `${pesas}%` }} 
                />
            </div>
            <span className="ml-3 text-base font-bold w-14 text-right text-white">{pesas}%</span>
        </div>

        {/* Músculo */}
        <div className="flex items-center">
            <label className="w-28 font-semibold text-white text-lg">Músculo:</label>
            <div className="flex-1 bg-gray-700 h-6 rounded-lg overflow-hidden">
                <div 
                    className={`${getProgressColor(musculo)} h-full transition-all duration-500`} 
                    style={{ width: `${musculo}%` }} 
                />
            </div>
            <span className="ml-3 text-base font-bold w-14 text-right text-white">{musculo}%</span>
        </div>

      </div>

      <div className="flex justify-center gap-4 mt-8">
        {/* Botones con estilos de Tailwind */}
        <button 
            className="px-8 py-4 bg-blue-500 text-white text-xl font-bold rounded-xl hover:bg-blue-600 transition shadow-lg" 
            onClick={comer}
        >
            🍗 Comer
        </button>
        
        <button 
            className="px-8 py-4 bg-green-500 text-white text-xl font-bold rounded-xl hover:bg-green-600 transition shadow-lg" 
            onClick={entrenar}
        >
            🏋️ Entrenar
        </button>
        
        <button 
            className="px-8 py-4 bg-purple-500 text-white text-xl font-bold rounded-xl hover:bg-purple-600 transition shadow-lg" 
            onClick={descansar}
        >
            😴 Descansar
        </button>
      </div>
    </div>
  );
}