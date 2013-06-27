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

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @happening }
    end
  end

  def create
    @happening = Happening.new(create_params)

    # respond_to do |format|
      if @happening.save
        # format.html { redirect_to @happening, notice: 'Happening was successfully created.' }
        render json: @happening, status: :created
        # , location: @happening 
      else
        # format.html { render action: "new" }
        render json: @happening.errors, status: :unprocessable_entity 
      end
    # end


  end

private

    def create_params
      params.require(:title)
      params.permit(
          :title)
    end

end
