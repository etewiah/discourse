class Ed::BulkHappeningsController < ApplicationController

  def show
    @bulk_happening = BulkHappening.last
    render json: @bulk_happening
  end

	def index
		@happenings = BulkHappening.all
		render json: @happenings
	end

	 def create
    @bulk_happening = BulkHappening.new(create_params)
    if @bulk_happening.save
      render json: @bulk_happening, status: :created
      # , location: @bulk_happening 
    else
      render json: @bulk_happening.errors, status: :unprocessable_entity 
    end
  end

private

    def create_params
      params.permit(:title, :raw_json)
      # .require(:bulk_happening).permit(:title, :raw_json)
    end
end
