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

  def update
    # Ed: right now, updates don't handle changing happening data itself 
    # only used to add comments...
    @happening = Happening.find(params[:id])
    if(params[:happening][:topic_id])
      @happening.topics.push(Topic.find(params[:happening][:topic_id]))
    end
    if @happening.save
      render json: @happening
    else
      render json: @happening.errors, status: :unprocessable_entity 
    end
  end

  # GET /happenings/1
  # GET /happenings/1.json
  def show
    @happening = Happening.find(params[:id])
# Ed: TODO: add a dummy topic that prompts user if no topics found...
    # @happening.topics.push (Topic.last)
    render json: @happening 
  end

  def create

    # User.where(:first_name => 'Scarlett').first_or_create(:last_name => 'Johansson')
    @happening = Happening.where(:source => params[:happening][:source], :meta => params[:happening][:meta]).first_or_initialize(create_params)

    if(params[:happening][:topic_id] && !params[:happening][:topic_id].empty?)
      @happening.topics.push(Topic.find(params[:happening][:topic_id]))
    end
    # @happening = Happening.new(create_params)
    if @happening.save
      render json: @happening, status: :created
      # , location: @happening 
    else
      render json: @happening.errors, status: :unprocessable_entity 
    end
  end

private

    def create_params
      params.require(:happening).permit(:title, :json_details, :starting_on, :start_slot, :ending_on, :end_slot,  :source, :meta, :city, :country)
    end

end
