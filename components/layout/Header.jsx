import Link from 'next/link';

export default function Header() {
    return(
        <nav>
            <Link href="/"><a>Accueil</a></Link>
            <Link href="/panier"><a>Panier</a></Link>
            <Link href="/panier/commander"><a>Commander</a></Link>
            <Link href="/contact"><a>Contact</a></Link>
        </nav>
    )
}