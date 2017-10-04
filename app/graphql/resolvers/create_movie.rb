class Resolvers::CreateMovie < GraphQL::Function

  argument :title, !types.String
  argument :overview, !types.String
  argument :release_date, !types.String
  argument :poster_path, types.String
  argument :user_id, !types.ID

  type Types::MovieType

  def call(_obj, args, _ctx)
    Movie.create(
      title: args[:title],
      overview: args[:overview],
      release_date: args[:release_date],
      poster_path: args[:poster_path],
      user_id: args[:user_id]
    )
  end
end
