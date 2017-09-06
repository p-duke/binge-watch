class PasswordsController < Devise::PasswordsController
  respond_to :json

  def new
    binding.pry
  end

  def edit
    binding.pry
  end

  def update
    binding.pry
    send_reset_password_instructions
  end

end
