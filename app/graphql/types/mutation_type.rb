Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createMovie, function: Resolvers::CreateMovie.new

  field :deleteMovie, Types::MovieType do
    argument :id, !types.ID
    argument :userID, !types.ID

    resolve -> (obj, args, ctx) {
      Movie.includes(:user).where(user_id: args[:userID], id: args[:id]).first.destroy
    }
  end
end
