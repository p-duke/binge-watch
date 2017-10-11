class Resolvers::UpdateMovie < GraphQL::Function

  argument :id, !types.ID
  argument :userID, !types.ID
  argument :watched, types.Boolean

  type Types::MovieType

  def call(_obj, args, _ctx)
    updated_movie = User.find(args[:userID]).movies.find(args[:id])
    updated_movie.update(watched: args[:watched])
    updated_movie
  end
end
