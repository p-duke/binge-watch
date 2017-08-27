class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    @user = User.new(sign_up_params)
    if @user.save
      sign_in @user
      data = { id: @user.id, username: @user.username, email: @user.email }
      render json: data
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:registration).permit(:username, :email, :password, :password_confirmation)
  end
end
