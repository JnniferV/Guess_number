// Autorisation et habilitation
// Vérifie si l'utilisateur est en session et (optionnellement) a un rôle donné

const checkUserInSession = (requiredRole = null) => {
  return (req, res, next) => {
    // vérifier qu'un user est en session
    const user = req.session?.user
    if (!user) {
      // Redirection vers login
      return res.redirect('/users/login')
    }
    // Si le rôle est requis. Vérifier le rôle de l'utilisateur en session
    if (requiredRole && user.role !== requiredRole) {
      // un user en session mais son rôle est USER au lieu ADMIN
      // Status 403 (Forbidden) - ACCES REFUSE
      return res.status(403).render('403', { title: 'Forbidden' })
    }
    next() // L'utilisateur est en session et on a validé son rôle si besoin
  }
}

module.exports = {
  checkUserInSession: checkUserInSession(),
  checkUserInSessionAndCheckRoleAdmin: checkUserInSession('admin'),
}
