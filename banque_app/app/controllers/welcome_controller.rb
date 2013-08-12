class WelcomeController < ActionController::Base
  # This line shouldn't be needed
  layout 'application'

  def index
    @accounts = Account.all
    respond_to do |format|
      format.html
      format.json { render json: @accounts }
    end
  end

end