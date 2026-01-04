export interface Mapper<T, R> {
  toDomain(entity: T): R;
  toEntity(domain: R): T;
}
