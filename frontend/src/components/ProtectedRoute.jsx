import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../utils/storage'

const ProtectedRoute = ({
  children,
  allowedRoles
}) => {
  const utilizador = getCurrentUser()

  if (!utilizador) {
    return <Navigate to="/login" replace />
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(utilizador.tipo)
  ) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default ProtectedRoute