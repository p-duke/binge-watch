class User < ApplicationRecord

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def authenticate(params)
    user = User.find_for_authentication(email: params[:email])
    user.valid_password?(params[:password])
  end
end
