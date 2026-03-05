import { Link } from 'react-router-dom';
// import { toAbsoluteUrl } from '@/lib/helpers';

export function Error404() {
  return (
    <>
      {/* <div className="mb-10">
        <img
          src={toAbsoluteUrl('media/illustrations/10.svg')}
          className="dark:hidden max-h-40"
          alt="image"
        />
        <img
          src={toAbsoluteUrl('media/illustrations/10-dark.svg')}
          className="hidden dark:block max-h-40"
          alt="image"
        />
      </div> */}

      <span className="badge badge-primary badge-outline mb-3">Erro 404</span>

      <h3 className="text-2xl font-semibold text-mono text-center mb-2">
        Esta página não existe ou foi movida.
      </h3>

      <div className="text-base text-center text-secondary-foreground mb-10">
        A página solicitada está ausente. Verifique o URL ou&nbsp;
        <Link
          to="/"
          className="text-info font-medium"
        >
          Volte para a página inicial
        </Link>
        .
      </div>
    </>
  );
}
