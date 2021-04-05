import './style.css';
import { colorPicker, getContrastType, getContrastColor } from '../../color_utils';

const Move = (props) => {
    return (
        <tr className="pokemon-move">
            <td>
                <font color={getContrastColor(props.color)}>{props.name}</font>
            </td>
            <td>
                <button style={{backgroundColor:colorPicker(props.type)}}>
                    <font color={getContrastType(props.type)}>{props.type}</font>
                </button>
            </td>
            {props.power && 
                <font color={getContrastColor(props.color)}>{props.power}</font>
            }
        </tr>
    )
}

export default Move;