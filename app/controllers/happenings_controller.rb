class HappeningsController < ApplicationController


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

end
