function handleSphereRequest(method, params, sphereRadius) {
    switch (method) {
      case 'sphere.set_radius':
        sphereRadius = params.radius;
        return { result: 'Radius set', newValue: sphereRadius };
      case 'sphere.get_radius':
        return { result: sphereRadius, newValue: sphereRadius };
      default:
        return { error: 'Unknown method' };
    }
  }
  
  module.exports = { handleSphereRequest };
  