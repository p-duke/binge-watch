Types::MovieType = GraphQL::ObjectType.define do
  name 'Movie'

  field :id, !types.ID
  field :title, !types.String
  field :overview, !types.String
  field :release_date, !types.String
  field :poster_path, types.String
  field :watched, types.Boolean
  field :rating, types.Int

  field :user, -> { Types::UserType }
end
