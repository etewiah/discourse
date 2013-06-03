class Admin::EmailController < Admin::AdminController

  def index

    # For now, just show the ActionMailer settings
    mail_settings = { delivery_method: ActionMailer::Base.delivery_method }

    mail_settings[:settings] = case mail_settings[:delivery_method]
    when :smtp
       ActionMailer::Base.smtp_settings.map {|k, v| {name: k, value: v}}
    when :sendmail
      ActionMailer::Base.sendmail_settings.map {|k, v| {name: k, value: v}}
    end

    render_json_dump(mail_settings)
  end

  def test
    params.require(:email_address)
    Jobs.enqueue(:test_email, to_address: params[:email_address])
    render nothing: true
  end

  def logs
    @email_logs = EmailLog.limit(50).includes(:user).order('created_at desc').all
    render_serialized(@email_logs, EmailLogSerializer)
  end

end
