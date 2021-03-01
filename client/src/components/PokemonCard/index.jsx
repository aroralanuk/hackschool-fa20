import React, { useRef, useEffect } from 'react';
import Move from '../Move';
import CanvasDraw from 'react-canvas-draw';
import './style.css';
import { getContrastColor, colorPicker } from '../../color_utils';

const PokemonCard = (props) => {

    const loadableCanvas = useRef();

    const displayedMoves = props.moves.map((move, key) => {
        return <Move key={key} name={move.name} type={move.type} />
    });

    useEffect(() => {
        if (loadableCanvas == null) { return; }
        loadableCanvas.current.loadSaveData(props.image, true);
    }, [props.image]);

    return (
        <div className="pokemon-card-container" style={{backgroundColor:props.color,borderColor:props.color}}>
            <div className="pokemon-card-container-inner">
                <CanvasDraw 
                    className="canvas-saved"
                    disabled
                    hideGrid
                    ref={loadableCanvas}
                    saveData={props.image}
                    canvasWidth={350}
                    canvasHeight={350}
                />

                <div className="pokemoncard-data-container">
                    <div className="pokemoncard-data-inner">
                        <div className="pokemoncard-name">
                            <p>{props.name}</p>
                        </div>
                        <div className="pokemoncard-description">
                            <p>{props.description}</p>
                        </div>
                        <div className="pokemoncard-types">
                            <button className="pokemon-type-1" style={{backgroundColor:colorPicker(props.type1)}}>
                                <font color={getContrastColor(props.type1)}>{props.type1}</font>
                            </button>
                            { props.type2 ?
                                <button className="pokemon-type-2" style={{backgroundColor:colorPicker(props.type2)}}>
                                    <font color={getContrastColor(props.type2)}>{props.type2}</font>
                                </button> : null
                            }
                        </div>
                        <div className="pokemon-moves">
                            <p className="pokemoncard-bold">Moves: </p>
                            <table className="moves-table">

                                <tbody>
                                    {displayedMoves}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PokemonCard;