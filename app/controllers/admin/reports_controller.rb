require_dependency 'report'

class Admin::ReportsController < ActionController::Base
	# Admin::AdminController

 before_filter :set_headers

  def set_headers
    response.headers["Access-Control-Allow-Origin"] = '*'
  end


  def show

    report_type = params[:type]

    raise Discourse::NotFound.new unless report_type =~ /^[a-z0-9\_]+$/

    report = Report.find(report_type)
    raise Discourse::NotFound.new if report.blank?

    render_json_dump(report: report)
  end

  def render_json_dump(obj)
    render json: MultiJson.dump(obj)
  end

  
end
