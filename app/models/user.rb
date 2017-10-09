class User < ApplicationRecord

  has_many :movies, dependent: :destroy
  validates :username, :email, :password, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def authenticate(params)
    return false unless params

    user = User.find_for_authentication(email: params[:email])
    user.valid_password?(params[:password])
  end
end
