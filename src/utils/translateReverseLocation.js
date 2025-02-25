// Write the name of the place depending the precision of the coordinates
const translateReverseLocation = (reversedLocation) => {
    if (reversedLocation.address.town) {
        return `${reversedLocation.address.town}, ${reversedLocation.address.state}, ${reversedLocation.address.country}`;
    }
    if (reversedLocation.address.city) {
        return `${reversedLocation.address.city}, ${reversedLocation.address.state}, ${reversedLocation.address.country}`;
    }
    if (reversedLocation.address.province) {
        return `${reversedLocation.address.province}, ${reversedLocation.address.state}, ${reversedLocation.address.country}`;
    }
    if (reversedLocation.address.county) {
        return `${reversedLocation.address.county}, ${reversedLocation.address.state}, ${reversedLocation.address.country}`;
    }
    return `${reversedLocation.address.state}, ${reversedLocation.address.country}`;
}

export default translateReverseLocation;