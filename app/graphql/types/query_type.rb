Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :userMovies, !types[Types::MovieType] do
    argument :userID, types.ID
    resolve -> (obj, args, ctx) { User.find(args["userID"]).movies }
  end
end
