export function xyzToSpherical(x,y,z){
    return {
        horizontalAngle : Math.atan(z/x),
        verticalAngle : Math.acos(y/(Math.sqrt(x*x+y*y+z*z)))
    }
}

export function sphericalToXyz(radius,horizontalAngle,verticalAngle){
    return {
        x : radius * Math.sin(verticalAngle) * Math.cos(horizontalAngle),
        y : radius * Math.cos(verticalAngle),
        z : radius * Math.sin(verticalAngle) * Math.sin(horizontalAngle)
    }
}