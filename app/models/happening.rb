class Happening < ActiveRecord::Base
  attr_accessible :starting_on,  :ending_on,  :city, :country, :address, :coordinates, :description, :end_slot, :json_details, :meta, :source, :start_slot, :title, :when

  has_many :topics
end
