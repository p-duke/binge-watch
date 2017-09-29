class Resolvers::CreateUser < GraphQL::Function
  AuthProviderInput = GraphQL::InputObjectType.define do
    name 'AuthProvidersSignupData'

    argument :email, Types::AuthProviderEmailInput
  end

  argument :username, !types.String
  argument :authProvider, !AuthProviderInput

  type Types::UserType

  def call(_obj, args, _ctx)
    User.create!(
      username: args[:username],
      email: args[:authProvider][:email][:email],
      password: args[:authProvider][:email][:password],
      password_confirmation: args[:authProvider][:email][:passwordConfirmation]
    )
  end
end
