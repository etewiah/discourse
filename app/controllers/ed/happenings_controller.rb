class Ed::HappeningsController < ApplicationController


  skip_before_filter :store_incoming_links
  # , only: [:short_link]
  skip_before_filter :check_xhr
  # , only: [:markdown,:short_link]
  

  def index
    @happenings = Happening.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @happenings }
    end
  end

  # GET /happenings/1
  # GET /happenings/1.json
  def show
    @happening = Happening.find(params[:id])

      render json: @happening 
    # respond_to do |format|
    #   # format.html # show.html.erb
    #   # format.json 
    #   render json: @happening 
    # end
  end

  def create
    @happening = Happening.new(create_params)
    if @happening.save
      render json: @happening, status: :created
      # , location: @happening 
    else
      render json: @happening.errors, status: :unprocessable_entity 
    end
  end

private

    def create_params
      params.require(:happening).permit(:title, :json_details)
    end

end
