type UrlDecoratorResult<T, Q> = (params?: T, query?: Q) => string;

interface PageStructure {
  url: T extends UrlDecoratorResult<any, any> ? T : UrlDecoratorResult<any, any>;
  component: React.FC;
}
