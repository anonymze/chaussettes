import Link from 'next/link'

export default function FourOhFour() {
  return <>
    <h1>404 - Une erreur est survenue, la page n'existe pas ou le serveur est en maintenance.</h1>
    <Link href="/">
      <a>
        Essayer de revenir à l'accueil.
      </a>
    </Link>
  </>
}