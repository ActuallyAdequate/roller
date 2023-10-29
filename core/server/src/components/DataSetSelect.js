import { useState } from "react"

export const DataSetSelect = () => {

    async function handleDatasetLoad() {
        console.log("render handle")
        const name = await window.electron.dataset.load();
        console.log(name);
    }


    return (
        <div>
            <button onClick={() => {handleDatasetLoad()}}>Load Data Sheet</button>
        </div>
    )
}