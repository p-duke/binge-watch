class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def new
    @user = User.new
  end

  def create
    @user = User.new(sign_up_params)
    if @user.save
      # sign_in @user
      data = { id: @user.id, username: @user.username, email: @user.email }
      render json: data
    else
      data = { errors: @user.errors.messages }
      render json: data, status: 422
    end
  end

  private

  def sign_up_params
    params.require(:registration).permit(:username, :email, :password, :password_confirmation)
  end
end
