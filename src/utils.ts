

export const getPosition = async () => {
  try {
    const position: any = await new Promise((req, res) => navigator.geolocation.getCurrentPosition(req, res))
    const coords:Coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
     
    } 
    return coords
  } catch(e) {console.log(e)}
}