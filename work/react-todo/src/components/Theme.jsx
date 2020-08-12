import React from "react";

const Theme = ({themeChoice,selectTheme}) =>{
    return (
        <div className="theme">
            <label> Theme: </label>
            <select onChange={(e)=> {selectTheme(e.target.value)}}>
                {themeChoice.map(theme => (
                        <option key={themeChoice.indexOf(theme)}>{theme}</option>
                    ))}
            </select>
        </div>
    )
}
export default Theme;
