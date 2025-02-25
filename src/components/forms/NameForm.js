import React from "react";

const NameForm = ({name, setName, handleSubmit}) => {
    return (
        <form className="custom-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="locationName">Location</label>
                <input
                    required
                    type="text"
                    id="locationName"
                    name="locationName"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                />
            </div>
            <button type="submit">Get Weather Data</button>
        </form>
    )
};
export default NameForm;